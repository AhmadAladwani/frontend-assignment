import houseImage from "../images/house.png"

export default function Navbar() {
    return (
        <nav className="h-1/6 shadow-lg flex justify-between items-center">
            <div className="w-4/6 flex justify-around items-center">
                <div className="flex justify-center items-center gap-2">
                    <img src={houseImage} alt="cart" className="w-10 h-10" />
                    <p className="text-2xl font-bold">Estatery</p>
                </div>
                <button className="py-2 px-4 active:bg-purple-100 active:text-purple-950">Rent</button>
                <button className="py-2 px-4 active:bg-purple-100 active:text-purple-950">Buy</button>
                <button className="py-2 px-4 active:bg-purple-100 active:text-purple-950">Sell</button>

                <div className="dropdown inline-block relative group hover:block">
                    <button className="py-2 px-4 rounded inline-flex items-center">
                        <span className="mr-1">Manage Property</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                    </button>
                    <ul className="w-full dropdown-menu absolute hidden text-gray-700 pt-1 group-hover:block">
                        <li className="w-full rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer">Property 1</li>
                        <li className="w-full bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer">Property 2</li>
                        <li className="w-full rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer">Property 3</li>
                    </ul>
                </div>

                <div className="dropdown inline-block relative group hover:block">
                    <button className="py-2 px-4 rounded inline-flex items-center">
                        <span className="mr-1">Resources</span>
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                    </button>
                    <ul className="w-full dropdown-menu absolute hidden text-gray-700 pt-1 group-hover:block">
                        <li className="w-full rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer">Resource 1</li>
                        <li className="w-full bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer">Resource 2</li>
                        <li className="w-full rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer">Resource 3</li>
                    </ul>
                </div>

            </div>
            <div className="w-2/6 p-5 space-x-5 flex justify-end">
                <button className="py-2 px-4 rounded text-purple-700 font-bold border border-purple-700">Login</button>
                <button className="py-2 px-4 rounded text-white font-bold bg-purple-700">Sign Up</button>
            </div>
        </nav>
    )
}