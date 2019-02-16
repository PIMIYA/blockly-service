class LedNode {
    constructor() {
        /** @type {number} - Index of node server. */
        this.Index = null;
        /** @type {string} - Url of node server. */
        this.Url = '';
        /** @type {number[]} - Boards index on node server. */
        this.BoardsIndex = [];
    }
}

module.exports = LedNode;
