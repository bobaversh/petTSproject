import Header from "../Components/Header/Header";
import FormatWork from "../Components/HomePage/FormatWork";
import PersonalFunction from "../Components/HomePage/PersonalFunction";
import StartPage from "../Components/HomePage/StartPage";

export default function Home() {
  return (
    <div className="p-1">
      <Header />
      <StartPage />
      <PersonalFunction />
      <FormatWork />
    </div>
  );
}
