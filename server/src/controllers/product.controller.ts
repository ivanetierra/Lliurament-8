import e, { Request, Response } from 'express';
import Product from '../models/product.model';

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll();
    res.json(products);
}

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if(product) {
        res.json(product);
    } else {
        res.status(404).json({
            msg: `Product with id ${id} not found`
        });
    }  
} 

export const createProduct = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        await Product.create(body);
        res.json({
          msg: "product created",
          body: body,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error creating product',
            error
        });
    }
}

export const updateProduct = async (req: Request, res: Response) => {  
    const { id } = req.params;
    const { body } = req;
    try {
        const product = await Product.findByPk(id);
        if (product) {
            await product.update(body);
            res.json({
                msg: 'Product updated',
                product
            });
        } else {
            res.status(404).json({
                msg: `Product with id ${id} not found`
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Error updating product',
            error
        });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (product) {
        await product.destroy();
        res.json({msg: `Product with id ${id} deleted`});
    } else { 
        res.status(404).json({
            msg: `Product with id ${id} not found`
        });
    }
}