const Store = require('../Models/Store');

// Add new store (POST /api/stores)
exports.addStore = async (req, res) => {
    const { name, latitude, longitude } = req.body;
    const store = new Store({ name, latitude, longitude });
    await store.save();
    res.status(201).json({ message: 'Store added successfully' });
};



// Get nearest store (POST /api/stores/nearest)
exports.findNearestStore = async (req, res) => {
    const { latitude, longitude } = req.body;
    const stores = await Store.find();

    let nearestStore = null;
    let minDistance = Infinity;

    stores.forEach((store) => {
        const dist = Math.sqrt(
            Math.pow(latitude - store.latitude, 2) + Math.pow(longitude - store.longitude, 2)
        );
        if (dist < minDistance) {
            minDistance = dist;
            nearestStore = store;
        }
    });

    res.json(nearestStore);
};
