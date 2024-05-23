const Products = require("../db/schema");

const getAllProducts = async (req, res) => {
    const productData = await Products.find();
    return res.status(200).json(productData);
}

const getAllProductsName = async (req, res) => {
    const pro = await Products.find();
    const html = `
    <ul>
        ${pro.map((n) => `<li>${n.name}</li>`).join("")}
    </ul>
    `
    return res.send(html);
}

const createNewProduct = async (req, res) => {
    const lastId = await Products.findOne().sort({ id: -1 });
    const newId = lastId ? lastId.id + 1 : 1;

    const body = req.body;

    const pro = await new Products({
        id: newId,
        name: body.name,
        feature: body.feature,
        price: body.price,
        rating: body.rating,
        company: body.company
    })

    try {
        const newPro = await pro.save();
        return res.json({ message: `new id:${newId} is created successfully`, data: newPro });
    } catch (err) {
        return res.json({ message: `ERROR: ${err.message}` });
    }
}


const selectById = async (req, res) => {
    const id = Number(req.params.id);
    const pro = await Products.findOne({ id: id });
    try {
        return res.json({ message: `Here's the data of id:${id}`, data: pro });
    } catch (err) {
        return res.json({ message: `Data not found id:${id}` });
    }
}

const updateProduct = async (req, res) => {
    const id = Number(req.params.id);
    const updatePro = await Products.findOneAndUpdate({ id: id }, req.body, { new: true, runValidators: true });

    if (!updatePro) {
        return res.json({ message: `Update not happen in this id:${id}` });
    }

    return res.json({ message: `Successfully Updated in id:${id}`, data: updatePro });
}

const deleteProduct = async (req, res) => {
    const id = Number(req.params.id);
    const deletePro = await Products.findOneAndDelete({ id: id });

    try {
        return res.json({ message: `id:${id} is delete Successfully`, data: deletePro });
    } catch (err) {
        return res.json({ message: `Something Error:${err.message}` });
    }
}

const selectByPagination = async (req, res) => {
    const { company, name, sort, select } = req.query;
    const queryObj = {};


    if (company) {
        queryObj.company = { $regex: company, $options: "i" };
    }

    if (name) {
        queryObj.name = { $regex: name, $options: "i" };
    }

    let apiData = Products.find(queryObj);

    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix)
    }

    if (select) {
        // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    // Pagination
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const pro = await apiData;
    return res.json({ data: pro, nbHits: pro.length });
}

module.exports = { getAllProducts, getAllProductsName, createNewProduct, selectById, updateProduct, deleteProduct, selectByPagination };