import { Response } from 'express';
import { AuthRequest } from '../types';
import { categoryService } from '../services/categoryService';
import { asyncHandler } from '../middleware/errorHandler';
import { validate, categorySchema } from '../utils/validators';

export const categoryController = {
  create: asyncHandler(async (req: AuthRequest, res: Response) => {
    const data = validate(categorySchema, req.body);
    const category = await categoryService.createCategory(data);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  }),

  getAll: asyncHandler(async (req: AuthRequest, res: Response) => {
    const categories = await categoryService.getCategories();

    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    });
  }),

  getCategory: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { slug } = req.params;
    const category = await categoryService.getCategory(slug);

    res.status(200).json({
      success: true,
      message: 'Category fetched successfully',
      data: category,
    });
  }),

  update: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const category = await categoryService.updateCategory(id, req.body);

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  }),

  delete: asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    await categoryService.deleteCategory(id);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  }),
};
