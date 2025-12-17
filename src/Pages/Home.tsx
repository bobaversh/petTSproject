import Header from "../Components/Header/Header";
import FormatWork from "../Components/HomePage/FormatWork";
import PersonalFunction from "../Components/HomePage/PersonalFunction";
// import StartPage from "../Components/HomePage/StartPage";

export default function Home() {
  return (
    <div>
    <Header />
    {/* <StartPage /> */}
    <PersonalFunction />
    <FormatWork />

    </div>
  );
}
