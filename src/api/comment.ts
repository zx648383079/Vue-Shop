import type { IPage, IComment, ICommentSubtotal } from './model';
import { fetch } from '@/utils/http';

export const getCommentList = (param: any) => fetch<IPage<IComment>>('shop/comment', param);

export const getCommentSubtotal =
    (itemId: number, itemType?: number) => fetch<ICommentSubtotal>('shop/comment/count',
    {item_id: itemId, item_type: itemType});
