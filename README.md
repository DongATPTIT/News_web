# News_web

Dự án phát triển trang Admin quản lí bài báo, với các tính năng chính: quản lí, thêm, sửa, xóa bài viết, quả lí người dùng đăng nhập, admin cũng có thể sửa, xóa thông tin của người dùng. Thống kê bài viết theo view,..
Người dùng có thể đăng nhập, chỉnh sửa thông tin của bản thân, trang chủ hiện thị list bài viết mới, ngoài ra còn có thể xem chi tiết bài viết,..

## Hướng Dẫn Cài Đặt

### 1. Clone Repository

Đầu tiên, clone repository từ GitHub:
   ```sh  

git clone https://github.com/DongATPTIT/News_web.git
cd repository
   ```
### 2. Cài đặt thư viện
Sau khi cài đă clone dự án từ git, cài đặt thư viện:
   ```sh  
            npm install
   ```
### 3. Cấu hình database
Cài đặt các thư viện cần thiết, sau đó thay đổi các config database cần thiết ở file: 
   ```sh  
    src/core/database/config/data-source.config.ts
   ```
### 4. Seed dữ liệu
Cần seed data để  phù hợp với việc hiển thị dữ liệu:
Seed tài khoản admin mặc định: 
   ```sh  
   npm run seed-admin
   ```
Seed dữ liệu bài viết ngẫu nhiên : 
   ```sh  
    npm run seed
   ```
### 5. Chạy dự án
Sau khi hoàn tất các bước, chạy dự án:
   ```sh  
   npm run dev

