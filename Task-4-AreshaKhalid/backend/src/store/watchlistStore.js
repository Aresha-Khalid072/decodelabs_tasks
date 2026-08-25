import Watchlist from "../models/Watchlist.js";



async function getAll() {
  return await Watchlist.find().sort({ createdAt: -1 });
}

async function add(item) {
  const alreadyExists = await Watchlist.findOne({ id: item.id });
  if (alreadyExists) {
    const watchlist = await getAll();
    return { added: false, watchlist };
  }

  await Watchlist.create(item);
  const watchlist = await getAll();
  return { added: true, watchlist };
}

async function remove(id) {
  const deleted = await Watchlist.findOneAndDelete({ id });
  const watchlist = await getAll();
  return { removed: !!deleted, watchlist };
}

export { getAll, add, remove };