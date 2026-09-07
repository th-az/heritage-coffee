import { CustomerReview } from '@/types';

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Nguyễn Lan Hương',
    role: 'Kiến trúc sư & Khách hàng quen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Không gian Heritage Coffee thực sự mang lại cảm hứng sáng tạo rất lớn. Ly Caffè Latte bọt sữa mềm như nhung, hương vị cà phê mộc thơm thoang thoảng không hề gắt. Bánh Croissant nướng mới giòn rụm bơ Pháp.',
    date: '02/09/2026',
    favoriteDrink: 'Caffè Latte Nghệ Thuật',
  },
  {
    id: 'rev-2',
    name: 'David Hoàng',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Là một tín đồ của Specialty Coffee, mình hoàn toàn bị thuyết phục bởi dòng Cold Brew ủ chậm ở đây. Vị chua thanh hoa quả tự nhiên rất rõ, hậu vị ngọt kéo dài. Quán chăm chút từ âm nhạc Jazz đến thái độ phục vụ.',
    date: '28/08/2026',
    favoriteDrink: 'Cold Brew Ủ Chậm 24H',
  },
  {
    id: 'rev-3',
    name: 'Trần Quỳnh Anh',
    role: 'Food Blogger & Content Creator',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Món Tiramisu rượu Rum và Bạc Xỉu Sài Gòn ở Heritage là bộ đôi không thể bỏ qua! Bánh phô mai đậm đà mà không hề ngấy, đóng gói giao hàng giữ nguyên form bánh cực kỳ chỉn chu.',
    date: '25/08/2026',
    favoriteDrink: 'Tiramisu & Bạc Xỉu Di Sản',
  },
  {
    id: 'rev-4',
    name: 'Phan Quốc Bảo',
    role: 'Doanh nhân khởi nghiệp',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Đặt bàn họp đối tác ở phòng VIP riêng tư rất sang trọng và yên tĩnh. Nhân viên chu đáo, tư vấn menu rất am hiểu gu thưởng thức của từng khách hàng. Đánh giá 10/10.',
    date: '20/08/2026',
    favoriteDrink: 'Pour Over Geisha Cầu Đất',
  },
];