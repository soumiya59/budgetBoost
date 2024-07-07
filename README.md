## 📌 About The Project

A financial management web application designed to help users effectively manage their accounts, track expenses and icomes, and set financial goals.

### Built With
* ![laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
* ![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* ![mysql](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

# Screenshots

#### Login

![screenshot](./public/screenshots/login.png)

#### Dashboard

![screenshot](./frontend/public/screenshots/dashboard.png)

#### Accounts

![screenshot](./frontend/public/screenshots/accounts.png)

#### Records

![screenshot](./frontend/public/screenshots/records.png)

#### Goals

![screenshot](./frontend/public/screenshots/goals.png)

#### pricing

![screenshot](./frontend/public/screenshots/pricing.png)

## Getting Started 
1. Make sure you have [composer](https://getcomposer.org/download/) installed.
2. Make sure you have latest stable version of [node](https://nodejs.org/en/download/) installed.

## Installation
1. `git clone https://github.com/soumiya59/budgetBoost.git`
2. `cd budgetBoost`
3. `cd backend && composer install && composer update`
4.  in backend folder Copy content of .env.example and paste it in a new file called .env and run `php artisan key:generate`
5.  in frontend folder Copy content of .env.example and paste it in a new file called .env
6. `cd frontend` 
7. `npm install`

## Development
- `cd backend && php artisan migrate`
- `php artisan db:seed --class=CategorySeeder`
- `php artisan db:seed`
- `php artisan serve`
- in another terminal `cd frontend && npm run dev` to run React app (if not working then --force)
