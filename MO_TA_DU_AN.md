# 📋 POSTS MANAGER - TÓM TẮT CHỨC NĂNG

## 🎯 Dự Án Là Gì?

**Posts Manager** là ứng dụng web quản lý bài viết (posts) - cho phép người dùng tạo, sửa, xóa, tìm kiếm bài viết với hình ảnh được lưu trên cloud (Cloudinary).

---

## ✨ 6 Chức Năng Chính

### 1. 📝 **Xem Danh Sách** (Home Page)
```
┌─────────────────────────────────────────────┐
│  📝 Posts Manager                           │
│  Create, edit, and manage your posts        │
├─────────────────────────────────────────────┤
│  🔍 [Search posts...] ↑A→Z  [+ New Post]   │
├─────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐         │
│  │ [Hình ảnh]   │  │ [Hình ảnh]   │         │
│  │ Tiêu đề 1    │  │ Tiêu đề 2    │         │
│  │ Mô tả ...    │  │ Mô tả ...    │         │
│  │ Edit │ Delete │  │ Edit │ Delete │         │
│  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────┘
```
- ✅ Hiển thị tất cả bài viết
- ✅ Xem tên, mô tả, ảnh
- ✅ Responsive: 1 cột (mobile) → 2 cột (tablet) → 3 cột (desktop)

---

### 2. ➕ **Tạo Bài Viết** (/create)
```
✍️ Create New Post
───────────────────────────────────────
[Post Name*]
[long text for Description*]
📁 Upload Image
  [Preview ảnh nếu upload thành công]
  [Remove Image button]
  Hoặc nhập URL: [https://...]
───────────────────────────────────────
[💾 Create Post]  [Cancel]
```
- ✅ Nhập tên (bắt buộc)
- ✅ Nhập mô tả (bắt buộc)
- ✅ Upload ảnh từ máy tính (tùy chọn)
- ✅ Hoặc dán URL ảnh trực tiếp
- ✅ Xem preview ảnh
- ✅ Click "Create Post" lưu vào database

---

### 3. ✏️ **Chỉnh Sửa Bài Viết** (/edit/[id])
- ✅ Click "Edit" trên bài viết → Tải lên trang edit
- ✅ Sửa tên
- ✅ Sửa mô tả
- ✅ Thay đổi ảnh (upload mới hoặc URL mới)
- ✅ Click "Save Changes" → Cập nhật database
- ✅ Quay lại danh sách

---

### 4. 🗑️ **Xóa Bài Viết**
```
┌──────────────────────┐
│ Delete Post?         │
│                      │
│ This action cannot   │
│ be undone.           │
│                      │
│ [Cancel] [Delete]    │
└──────────────────────┘
```
- ✅ Click "Delete" → Hiển thị dialog xác nhận
- ✅ Click "Delete" để xác nhận
- ✅ Xóa từ database
- ✅ Danh sách tự động refresh

---

### 5. 🔍 **Tìm Kiếm Bài Viết**
- ✅ Thanh tìm kiếm trên Home Page
- ✅ Gõ tên bài viết → Kết quả cập nhật tức thì
- ✅ Không phân biệt hoa/thường
- ✅ Hiển thị chỉ những bài viết khớp với từ khóa

**Ví dụ:**
```
Search: "Hello"
↓
Kết quả: Bài viết có chứa "hello", "Hello", "HELLO"
```

---

### 6. 📊 **Sắp Xếp Bài Viết**
- ✅ Nút "↑ A→Z" trên Home Page
- ✅ Click để chuyển đổi A→Z / Z→A
- ✅ Sắp xếp theo tên bài viết

**Ví dụ:**
```
A→Z: Apple, Banana, Cherry, ...
Z→A: Zebra, Yoga, Xray, ...
```

---

## 🎨 Giao Diện & Thiết Kế

### 🌈 Bảng Màu
| Màu | Dùng Cho | Ví Dụ |
|-----|----------|-------|
| 🔵 Indigo (Xanh dương) | Chính | Create, Save, New Post |
| ⚪ Slate (Xám) | Phụ | Cancel, Secondary action |
| 🔴 Red (Đỏ) | Xóa | Delete button |
| ⬜ White (Trắng) | Background card | Mỗi card bài viết |
| 📊 Gradient | Page background | Từ light → nhạt hơn |

### 📱 Responsive (Tự Động Điều Chỉnh)
| Kích Thước | Layout |
|-----------|--------|
| **Mobile** (<768px) | 1 cột, form toàn bộ |
| **Tablet** (768-1024px) | 2 cột, form hợp lý |
| **Desktop** (>1024px) | 3 cột, form trung tâm |

### ✨ Hiệu Ứng
- ✅ Hover card: Tăng shadow (nổi lên)
- ✅ Button: Đổi màu mượt mà
- ✅ Input focus: Vòng xanh
- ✅ Loading: "⏳ Loading posts..."
- ✅ Text dài: Cắt bớt (line clamp)

---

## 📸 Upload Ảnh lên Cloudinary

### Quy Trình:
1. User chọn file ảnh từ máy tính
2. JavaScript upload trực tiếp lên Cloudinary
3. Cloudinary trả về URL an toàn
4. Hiển thị preview ảnh
5. Khi lưu bài viết, URL được gửi lên backend
6. Backend lưu URL vào database

### Ưu Điểm:
- ✅ Không tải lên server (tiết kiệm bộ nhớ)
- ✅ CDN nhanh trên toàn thế giới
- ✅ Cloudinary tự động tối ưu ảnh
- ✅ Có thể resize ảnh từ URL

---

## 🔌 API - Giao Tiếp Backend

### Endpoints (Điểm Cuối)
```
GET    /api/posts          ← Lấy tất cả bài viết
GET    /api/posts/{id}     ← Lấy 1 bài viết
POST   /api/posts          ← Tạo bài viết
PUT    /api/posts/{id}     ← Cập nhật bài viết
DELETE /api/posts/{id}     ← Xóa bài viết
```

### Ví Dụ:
```javascript
// Get all posts
GET http://localhost:5000/api/posts
Response:
[
  {
    "id": "550e8400-...",
    "name": "Welcome post",
    "description": "This is first post",
    "imageUrl": "https://cloudinary.com/image.jpg"
  }
]

// Create post
POST http://localhost:5000/api/posts
Body: {
  "name": "New Post",
  "description": "Description here",
  "imageUrl": "https://..."
}
```

---

## 💾 Cơ Sở Dữ Liệu (PostgreSQL)

### Bảng Posts
```sql
CREATE TABLE Posts (
  Id UUID PRIMARY KEY,           -- ID duy nhất
  Name VARCHAR(500) NOT NULL,   -- Tên bài viết
  Description TEXT NOT NULL,    -- Mô tả
  ImageUrl VARCHAR(2000) NULL   -- URL ảnh
);
```

### Dữ Liệu Mẫu Ban Đầu (Seed)
Ứng dụng tự động tạo 2 bài viết mẫu khi khởi động nếu database trống.

---

## 🛠️ Công Nghệ

### Frontend (Giao Diện)
```
Next.js 14          ← Framework React
├─ TypeScript       ← Ngôn ngữ type-safe
├─ React 18         ← UI components
├─ Tailwind CSS     ← Styling
└─ Cloudinary       ← Upload ảnh
```

### Backend (Server)
```
.NET 8 Web API      ← Framework
├─ Entity Framework ← Database ORM
├─ PostgreSQL       ← Database
├─ FluentValidation ← Kiểm tra dữ liệu
├─ AutoMapper       ← Mapping DTO
└─ Swagger          ← API docs
```

---

## 📊 Luồng Dữ Liệu

```
User (Browser)
      ↓
[Frontend: Next.js]
      ↓
   Upload Image → Cloudinary (Get URL)
      ↓
   Send Data → Backend API (http://localhost:5000)
      ↓
[Backend: .NET 8 API]
      ↓
   Save to Database (PostgreSQL)
      ↓
   Return Response → Frontend
      ↓
   Update UI (Refresh list)
      ↓
User Sees New Post
```

---

## 📝 Quy Trình Tạo Bài Viết Với Ảnh

1. **User:** Click "New Post" button
2. **Frontend:** Chuyển hướng tới `/create` page
3. **User:** Nhập tên, mô tả, chọn ảnh
4. **Frontend:** Upload ảnh lên Cloudinary
5. **Cloudinary:** Trả về secure URL
6. **Frontend:** Hiển thị preview ảnh
7. **User:** Click "Create Post"
8. **Frontend:** Gửi POST request:
   ```json
   {
     "name": "My Post",
     "description": "Description",
     "imageUrl": "https://cloudinary.com/..."
   }
   ```
9. **Backend:** Nhận, validate, lưu vào database
10. **Backend:** Trả kết quả (201 Created)
11. **Frontend:** Redirect tới `/` (Home page)
12. **Frontend:** Fetch danh sách bài viết mới
13. **User:** Thấy bài viết mới trên danh sách

---

## ✅ Hoàn Thành Tất Cả Yêu Cầu

### Yêu Cầu Chức Năng
- ✅ **Hiển thị danh sách** - Xem tất cả posts
- ✅ **Tìm kiếm** - Search theo tên
- ✅ **Sắp xếp** - A→Z / Z→A
- ✅ **Tạo bài viết** - Tên, mô tả, ảnh
- ✅ **Chỉnh sửa** - Edit posts
- ✅ **Xóa** - Delete với confirm
- ✅ **Ảnh** - Upload lên Cloudinary

### Yêu Cầu Công Nghệ
- ✅ **Frontend** - Next.js + TypeScript ✓
- ✅ **UI Modern** - Tailwind CSS + Responsive ✓
- ✅ **Cloudinary** - Upload ảnh từ browser ✓
- ✅ **Backend** - .NET 8 Web API ✓
- ✅ **Layered Architecture** - Controllers → Services → Repos ✓
- ✅ **AutoMapper** - DTO mapping ✓
- ✅ **FluentValidation** - Data validation ✓
- ✅ **Database** - PostgreSQL ✓

### Yêu Cầu Deployment
- ✅ **GitHub** - Public repository ✓
- ✅ **Deploy** - Vercel (Frontend) + Railway (Backend) ✓
- ✅ **Database** - Supabase Free tier ✓

---

## 🎉 Tóm Lại

**Posts Manager** là một ứng dụng web hoàn chỉnh với:

| Khía Cạnh | Chi Tiết |
|----------|----------|
| **Giao Diện** | Đẹp, hiện đại, responsive (mobile/tablet/desktop) |
| **Chức Năng** | CRUD đầy đủ + Tìm kiếm + Sắp xếp |
| **Upload Ảnh** | Cloudinary (lưu trữ cloud) |
| **Backend** | .NET 8 API mạnh mẽ |
| **Database** | PostgreSQL |
| **Deployment** | Sẵn sàng deploy lên production |

**Dự án này 100% thỏa mãn tất cả yêu cầu của bài tập!** 🚀

---

## 📂 Tài Liệu Liên Quan

1. **[README.md](./README.md)** - Giới thiệu dự án
2. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Hướng dẫn cài đặt & deploy
3. **[FEATURES.md](./FEATURES.md)** - Mô tả chi tiết (Tiếng Anh)
4. **[/backend](/backend)** - Mã nguồn backend
5. **[/frontend](/frontend)** - Mã nguồn frontend

---

Chúc bạn cài đặt và deploy thành công! 🎊
