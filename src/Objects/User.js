
const MAX_ITEMS = '3'

class User {
    username = ''
    email = ''
    _wishlist = []

    addWishlistItem = (item) => {
        if (this._wishlist.length >= MAX_ITEMS) {
            console.log('Error: max items reached')
            return
        }
        this._wishlist.push(item)
    }
}

export default User