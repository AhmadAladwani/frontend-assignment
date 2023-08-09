import { useRef, useState } from "react"
import propertiesMock, { property, propertyType } from "../mockData"
import dateImage from "../images/date.png"
import bedImage from "../images/bed.png"
import bathroomImage from "../images/bathroom.png"
import areaImage from "../images/area.png"
import whiteHeartImage from "../images/white heart.png"
import redHeartImage from "../images/red heart.png"

type priceRange = {
    min: string,
    max: string
}

const pricesRangeList: priceRange[] = [
    { min: '500', max: '2,499' },
    { min: '2,500', max: '3,499' },
    { min: '3,500', max: '5,000' },
]

export default function MainContent() {
    const [properties, setProperties] = useState(propertiesMock)
    const dateRef = useRef<HTMLInputElement>(null!)

    const [locationFilter, setLocationFilter] = useState<string>('')
    const [priceFilter, setPriceFilter] = useState<priceRange | 'All Prices'>('All Prices')
    const [propertyTypeFilter, setPropertyTypeFilter] = useState<propertyType>('All Property Types')
    const [dateFilter, setDateFilter] = useState<string>('')

    const [sortedProperties, setSortedProperties] = useState<property[]>(properties)

    function handleSearch() {
        setSortedProperties(properties.filter(property => {
            if (!property.name.toLowerCase().includes(locationFilter.toLowerCase()) && !property.location.toLowerCase().includes(locationFilter.toLowerCase())) return false

            if (dateFilter.length > 0) {
                const pickedDate = new Date(dateFilter).getTime()
                const propertyDate = new Date(property.date).getTime()
                if (pickedDate < propertyDate) return false
            }

            if (priceFilter !== 'All Prices') {
                const propertyPrice = parseFloat(property.price.replace(/,/g, ''))
                const min = parseFloat(priceFilter.min.replace(/,/g, ''))
                const max = parseFloat(priceFilter.max.replace(/,/g, ''))
                if ((propertyPrice < min || propertyPrice > max)) return false
            }

            if (propertyTypeFilter !== 'All Property Types') {
                if (property.type !== propertyTypeFilter) return false
            }

            return true
        }))
    }

    function toggleFavorite(sortedPropertyId: number) {
        setProperties(prevProperties => prevProperties.map(property => {
            if (property.id === sortedPropertyId) {
                return { ...property, favorite: !property.favorite }
            } else {
                return property
            }
        }))

        setSortedProperties(prevSortedProperties => prevSortedProperties.map(sortedProperty => {
            if (sortedProperty.id === sortedPropertyId) {
                return { ...sortedProperty, favorite: !sortedProperty.favorite }
            } else {
                return sortedProperty
            }
        }))
    }


    return (
        <main className="p-20">
            <div className="flex justify-between items-center">
                <p className="text-3xl font-bold">Search properties to rent</p>
                <input className="p-5 border-2 border-gray-500" list="search-items" id="search-choice" name="search-choice" placeholder="Search with Search Bar" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} />
                <datalist id="search-items">
                    <option value="Palm Harbor">Palm Harbor</option>
                    <option value="Beverly Springfield">Beverly Springfield</option>
                    <option value="Faulkner Ave">Faulkner Ave</option>
                </datalist>
            </div>
            <div className="w-full min-h-full p-5 my-5 bg-white flex justify-evenly items-center divide-x-4 divide-black shadow-2xl">
                <div className="w-full min-h-full p-5 flex flex-col justify-center items-start">
                    <p className="text-gray-500">Location</p>
                    <p className="w-full h-full text-xl font-bold">{locationFilter.length > 0 ? locationFilter : "Not Selected"}</p>
                </div>
                <div className="w-full min-h-full p-5 flex flex-col justify-center items-start">
                    <p className="text-gray-500">When</p>
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="w-full h-full text-xl font-bold">{dateFilter ? dateFilter : "Select Move-in Date"}</p>
                        <input ref={dateRef} className="invisible absolute" id="when" name="when" type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
                        <label htmlFor="when" onClick={() => dateRef.current.showPicker()}><img src={dateImage} alt="date" className="w-5 h-5" /></label>
                    </div>
                </div>
                <div className="w-full min-h-full p-5 flex flex-col justify-center items-start">
                    <p className="text-gray-500">Price</p>
                    <div className="w-full h-full dropdown inline-block relative group hover:block">
                        <button className="w-full h-full justify-between py-2 rounded inline-flex items-center">
                            <span className="text-xl font-bold">{priceFilter === "All Prices" ? "All Prices" : `$${priceFilter.min}-$${priceFilter.max}`}</span>
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                        </button>
                        <ul className="w-full dropdown-menu absolute hidden text-gray-700 pt-1 group group-hover:block">
                            <li className="w-full rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer" onClick={() => setPriceFilter(pricesRangeList[0])}>${pricesRangeList[0].min}-${pricesRangeList[0].max}</li>
                            <li className="w-full bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer" onClick={() => setPriceFilter(pricesRangeList[1])}>${pricesRangeList[1].min}-${pricesRangeList[1].max}</li>
                            <li className="w-full rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer" onClick={() => setPriceFilter(pricesRangeList[2])}>${pricesRangeList[2].min}-${pricesRangeList[2].max}</li>
                            <li className="w-full rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer" onClick={() => setPriceFilter("All Prices")}>All Prices</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full min-h-full p-5 flex flex-col justify-center items-start">
                    <p className="text-gray-500">Property Type</p>
                    <div className="w-full h-full dropdown inline-block relative group hover:block">
                        <button className="w-full h-full justify-between py-2 rounded inline-flex items-center">
                            <span className="text-xl font-bold">{propertyTypeFilter ?? "Houses"}</span>
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                        </button>
                        <ul className="w-full dropdown-menu absolute hidden text-gray-700 pt-1 group-hover:block">
                            <li className="w-full p-5 rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer" onClick={() => setPropertyTypeFilter("Houses")}>Houses</li>
                            <li className="w-full bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer" onClick={() => setPropertyTypeFilter("Apartments")}>Apartments</li>
                            <li className="w-full rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer" onClick={() => setPropertyTypeFilter("Buildings")}>Buildings</li>
                            <li className="w-full rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer" onClick={() => setPropertyTypeFilter("All Property Types")}>All Property Types</li>
                        </ul>
                    </div>
                </div>
                <div className="w-full h-full p-5">
                    <button className="w-full p-5 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-950" onClick={() => handleSearch()}>Search</button>
                </div>
            </div >
            <div className="grid grid-cols-3 auto-rows-fr justify-center items-center gap-10">
                {sortedProperties.map(sortedProperty => {
                    return (
                        <div key={sortedProperty.id} className="w-full h-full bg-white flex flex-col shadow-2xl rounded-3xl overflow-hidden">
                            <img src={sortedProperty.image} alt="property image" className="w-full min-h-[50%] max-h-72" />
                            <div className="p-5 w-full h-full relative">
                                <img src={sortedProperty.favorite ? redHeartImage : whiteHeartImage} alt="favorite" className="absolute top-[15%] left-3/4 w-10 h-10" onClick={() => toggleFavorite(sortedProperty.id)} />
                                <div className=" w-full h-4/6 flex flex-col justify-start items-start gap-5">
                                    <p className="text-sm text-purple-700"><span className="text-2xl font-bold">${sortedProperty.price}</span>/month</p>
                                    <p className="text-2xl font-bold">{sortedProperty.name}</p>
                                    <p className="text-sm text-gray-500">{sortedProperty.location}</p>
                                </div>
                                <div className="w-full h-2/6 mt-5 flex justify-between items-center">
                                    <div className="max-w-full">
                                        <img src={bedImage} alt="bed" className="w-5 h-5 inline" />
                                        <p className="inline ml-1">{sortedProperty.beds} Beds</p>
                                    </div>
                                    <div className="max-w-full">
                                        <img src={bathroomImage} alt="bathroom" className="w-5 h-5 inline" />
                                        <p className="inline ml-1">{sortedProperty.bathrooms} Bathrooms</p>
                                    </div>
                                    <div className="max-w-full">
                                        <img src={areaImage} alt="area" className="w-5 h-5 inline" />
                                        <p className="inline ml-1">{sortedProperty.width}x{sortedProperty.height}m<sup>2</sup></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main >
    )
}