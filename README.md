# Quản lý nhân viên - React + Spring Boot

Viết lại từ bản PHP + MySQL + Bootstrap cũ, giữ nguyên nghiệp vụ: CRUD nhân viên, mã nhân viên tự sinh (NV001, NV002, ...).

## Cấu trúc

```
employee-management/
├── backend/     # Spring Boot REST API (Java 17, Maven)
└── frontend/    # React (Vite) + Bootstrap 5 + Axios
```

## 1. Chạy Backend (Spring Boot)

**Yêu cầu:** Java 17+, Maven, MySQL đang chạy.

1. Tạo database (hoặc để tự tạo nhờ `createDatabaseIfNotExist=true`):
   ```sql
   CREATE DATABASE IF NOT EXISTS employee_management;
   ```

2. Mở `backend/src/main/resources/application.properties`, sửa lại username/password MySQL cho đúng máy bạn:
   ```
   spring.datasource.username=root
   spring.datasource.password=root
   ```

3. Chạy:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

   Backend chạy tại: `http://localhost:8080`
   Bảng `employees` sẽ được Hibernate tự tạo (do `ddl-auto=update`).

## 2. Chạy Frontend (React)

**Yêu cầu:** Node.js 18+.

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:5173`

## 3. API Endpoints

| Method | Endpoint                          | Chức năng                          |
|--------|------------------------------------|-------------------------------------|
| GET    | /api/employees                    | Lấy tất cả nhân viên                |
| GET    | /api/employees?keyword=...        | Tìm theo tên hoặc mã NV             |
| GET    | /api/employees/{id}                | Lấy 1 nhân viên theo id             |
| POST   | /api/employees                    | Thêm nhân viên (mã NV tự sinh)      |
| PUT    | /api/employees/{id}                | Cập nhật nhân viên                  |
| DELETE | /api/employees/{id}                | Xóa nhân viên                       |

## 4. Ghi chú

- Mã nhân viên (employeeCode) được sinh tự động ở backend theo dạng `NV001`, `NV002`... dựa trên mã lớn nhất hiện có trong bảng — không cho phép nhập tay, giống logic AJAX auto-generate ở bản PHP cũ.
- CORS đã được cấu hình cho phép `http://localhost:5173` và `http://localhost:3000` gọi API (xem `CorsConfig.java`). Khi deploy thật, đổi lại domain cho đúng.
- Validate cơ bản: họ tên bắt buộc, email đúng định dạng và không trùng.
- Nếu muốn dùng H2 (không cần cài MySQL) để test nhanh, có thể thay dependency `mysql-connector-j` bằng `com.h2database:h2` và đổi `spring.datasource.url` tương ứng.
