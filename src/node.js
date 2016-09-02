class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (node != null) {
            if (this.left == null) {
                this.left = node;
                node.parent = this;
            } else if (this.right == null) {
                this.right = node;
                node.parent = this;
            }
        }
    }

    removeChild(node) {
        if (this.left == node) {
            node.parent = null;
            this.left = null;
        } else if (this.right == node) {
            node.parent = null;
            this.right = null;
        } else {
            throw new Error("Not a child");
        }
    }

    remove() {
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    }

    swapWithParent() {
        if (this.parent == null) return;

        var parent = this.parent;
        var leftChild = parent.left == this;
        var brother = leftChild ? parent.right : parent.left;

        this.remove();

        if (parent.parent != null) {
            var grandPa = parent.parent;
            var parentLeftChild = grandPa.left == parent;
            var uncle = parentLeftChild ? grandPa.right : grandPa.left;
            parent.remove();

            if (uncle != null) {
                uncle.remove();
            }

            if (parentLeftChild) {
                grandPa.appendChild(this);
                if (uncle != null) {
                    grandPa.appendChild(uncle);
                }
            } else {
                grandPa.appendChild(uncle);
                grandPa.appendChild(this);
            }
        }

        if (brother != null) {
            brother.remove();
        }

        var left = this.left;
        var right = this.right;
        if (left != null){
            left.remove();
        }
        if (right != null){
            right.remove();
        }

        if (leftChild) {
            this.appendChild(parent);
            if (brother != null)
                this.appendChild(brother);
            if (left != null) {
                this.left.appendChild(left);
                if (right != null) {
                    this.left.appendChild(right);
                }
            }
        } else {
            this.appendChild(brother);
            this.appendChild(parent);
            if (left != null) {
                this.right.appendChild(left);
                if (right != null) {
                    this.right.appendChild(right);
                }
            }
        }
    }
}

module.exports = Node;
