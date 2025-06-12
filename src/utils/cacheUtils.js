class Cache {
    constructor(size) {
        this._size = size;
        this._count = 0;
        this._memory = Array(size).fill(null);
    }

    Push(obj) {
        if(this._count != size)
        {
            this._memory[this._count] = obj;
            ++this._count;
            return;
        }

        for (let i = this._memory.length - 2; i >= 0; --i) {
            this._memory[i+1] = this._memory[i];
        }

        this._memory[0] = obj;
    }

    Peek(index) {
        if(index === undefined)
            return obj[0];

        return this._memory[index];
    }

    Remove(index) {
        for(let i = index; i < this._count; ++i)
        {
            this._memory[i] = this._memory[i+1];
        }

        this._memory[this._count-1] = null;

        this._count -= 1;
    }
}

module.exports.Cache = Cache;