import { Pagination } from 'src/app/_models/vademecum/indicators.model';

/** Moderación de comentarios de Vademécum (API-16: /vademecum/admin/ratings). */

export type CommentStatus = 'pending' | 'approved' | 'hidden';

export interface AdminRating {
  id: string;
  sheet: { id: string; code: string; title: string } | null;
  account: { id: string; email: string; firstName: string; lastName: string } | null;
  stars: number;
  comment: string;
  commentStatus: CommentStatus;
  moderatedBy: { id: string; name: string | null } | null;
  moderatedAt: string | null;
  updatedAt: string;
}

export interface AdminRatingList {
  records: AdminRating[];
  pagination: Pagination;
}

export interface RatingFilters {
  commentStatus: CommentStatus;
  sheetId: string | null;
}
