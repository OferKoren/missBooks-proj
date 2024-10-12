const { useState } = React
export function BookFilter({ filterBy, onSetFilter, defaultFilterby }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    function handleChange({ target }) {
        const field = target.name
        // console.log('field:', field)
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    function onClearFilter() {
        console.log('clearing filter')
        setFilterByToEdit({ ...defaultFilterby })
        onSetFilter({ ...defaultFilterby })
    }
    // console.log('render filter')
    return (
        <section className="book-filter">
            <h2>Filter books:</h2>
            <form action="" onSubmit={(ev) => onFilter(ev)}>
                <label htmlFor="title">title</label>
                <input onChange={handleChange} value={filterByToEdit.txt} type="text" name="txt" id="title" placeholder="Search by title..." />
                <label htmlFor="price">price</label>
                <input onChange={handleChange} value={filterByToEdit.price} type="number" name="price" id="price" placeholder="Search by Price" />
                <button>filter</button>
                <button type="button" onClick={onClearFilter}>
                    clear filter
                </button>
            </form>
        </section>
    )
}
