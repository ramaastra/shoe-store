const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ShoeController {
  static async listPage(req, res) {
    const result = await prisma.shoe.findMany({
      include: {
        category: true
      }
    });
    res.render("pages/shoe/list", { shoes: result });
  }

  static async detailPage(req, res) {
    const result = await prisma.shoe.findUnique({
      include: {
        category: true
      },
      where: {
        id: Number(req.params.id)
      }
    });
    res.render("pages/shoe/detail", { shoe: result });
  }

  static async createPage(req, res) {
    const categoryList = await prisma.category.findMany();
    res.render("pages/shoe/add", { categories: categoryList });
  }

  static async store(req, res) {
    const { name, merk, qty, available, price, desc, category } = req.body;
    const img = req.file.filename;
    await prisma.shoe.create({
      data: {
        name: name,
        merk: merk,
        qty: Number(qty),
        available: available === "true" ? true : false,
        price: Number(price),
        img: img,
        desc: desc,
        categoryId: Number(category),
      }
    });

    res.redirect("/shoe");
  }

  static async editPage(req, res) {
    const categoryList = await prisma.category.findMany();
    const result = await prisma.shoe.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    res.render("pages/shoe/edit", { shoe: result, categories: categoryList });
  }

  static async update(req, res) {
    const { name, merk, qty, available, price, desc, category } = req.body;
    const img = req.hasOwnProperty("file") ? req.file.filename : req.body.img;
    await prisma.shoe.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: name,
        merk: merk,
        qty: Number(qty),
        available: available === "true" ? true : false,
        price: Number(price),
        img: img,
        desc: desc,
        categoryId: Number(category),
      }
    });

    res.redirect("/shoe");
  }

  static async delete(req, res) {
    await prisma.shoe.delete({
      where: {
        id: Number(req.params.id),
      }
    });

    res.redirect("/shoe");
  }
}

module.exports = ShoeController;
