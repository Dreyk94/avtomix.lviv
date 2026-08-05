-- ============================================================
-- Avto Mix — налаштування бази даних Supabase
-- Виконати весь цей файл одним разом у SQL Editor вашого проєкту Supabase
-- ============================================================

-- 1. Таблиця профілів користувачів (роль зберігається тут)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'user' check (role in ('user','publisher','admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Автоматично створює профіль з роллю "user" при реєстрації нового акаунта
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Таблиця оголошень (авто)
create table public.cars (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id),
  brand text, model text, trim text, year int, vin text,
  engine_volume numeric, power int, fuel text, trans text, drive text,
  color text, mileage int, owners int, body text, description text,
  price numeric, city text, phone text, telegram text, viber text,
  whatsapp text, tiktok_url text, photos text[] default '{}',
  published boolean not null default false,
  views int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.cars enable row level security;

-- Хто бачить оголошення: усі бачать опубліковані; автор бачить свої;
-- адміністратор бачить усі (включно з тими, що на модерації)
create policy "Published cars are visible to everyone"
  on public.cars for select
  using (
    published = true
    or auth.uid() = owner_id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Додавати оголошення можуть лише publisher і admin
create policy "Publishers and admins can add cars"
  on public.cars for insert
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','publisher'))
  );

-- Редагувати/публікувати можуть автор або адміністратор
create policy "Owners and admins can update cars"
  on public.cars for update
  using (
    auth.uid() = owner_id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Видаляти можуть автор або адміністратор
create policy "Owners and admins can delete cars"
  on public.cars for delete
  using (
    auth.uid() = owner_id
    or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- 3. Сховище для фото авто (публічно доступне для перегляду)
insert into storage.buckets (id, name, public)
values ('car-photos', 'car-photos', true)
on conflict (id) do nothing;

create policy "Anyone can view car photos"
  on storage.objects for select
  using (bucket_id = 'car-photos');

create policy "Authenticated users can upload car photos"
  on storage.objects for insert
  with check (bucket_id = 'car-photos' and auth.role() = 'authenticated');

-- ============================================================
-- Готово. Після виконання:
-- 1. Зареєструйтесь на сайті (стане акаунт з роллю 'user')
-- 2. У Supabase зайдіть в Table Editor -> profiles -> знайдіть свій рядок
--    -> змініть значення role на 'admin' -> Save
-- 3. Щоб дозволити комусь публікувати оголошення — так само зміните
--    його role на 'publisher'
-- ============================================================
