export default function Home () {
    return (
        <>
        <div className="p-10">
            <h2 className="text-xl mb-4 font-bold text-black">И так, что мы тут делоем...</h2>
            <p className="font-light text-black"> Это хоумпейдж </p>
            <button className="m-2 p-4 rounded-2xl bg-amber-600" onClick={()=>{console.log(localStorage.getItem('token'))}}>Click</button>
        </div>
        </>
    )
}