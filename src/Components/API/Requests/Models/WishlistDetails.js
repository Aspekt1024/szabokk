// WishlistDetails describes the data required to create or update a wishlist item
class WishlistDetails {
    username = ''
    number = ''
    item = ''
    link = ''
    comment = ''

    constructor(username, itemNumber) {
        this.username = username
        this.number = itemNumber
    }

    getJSON() {
        return JSON.stringify({
            username: this.username,
            number: this.number,
            item: this.item,
            link: this.link,
            comment: this.comment
        })
    }
}

export default WishlistDetails