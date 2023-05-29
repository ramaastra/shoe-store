const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class CategoryController {
  static async listPage(req, res) {
    const result = await prisma.category.findMany();
    res.render("pages/category/list", { categories: result });
  }

  static async createPage(req, res) {
    res.render("pages/category/add");
  }

  static async store(req, res) {
    const { name } = req.body;
    await prisma.category.create({
      data: {
        name: name,
      }
    });

    res.redirect("/category");
  }

  static async editPage(req, res) {
    const result = await prisma.category.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    res.render("pages/category/edit", { category: result });
  }

  static async update(req, res) {
    const { name } = req.body;
    await prisma.category.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
      }
    });
    res.redirect("/category");
  }

  static async delete(req, res) {
    await prisma.category.delete({
      where: {
        id: Number(req.params.id),
      }
    });
    res.redirect("/category");
  }
}

module.exports = CategoryController;
