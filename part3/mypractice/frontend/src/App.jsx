import { useState, useEffect } from "react";
import animalService from "./services/animals";
import Animal from "./components/Animal";
import FilterAnimal from "./components/Filter";
import AddAnimal from "./components/Add";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = (props) => {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState("Add your favorite Animal");
  const [showAll, setShowAll] = useState(true);
  const [filteredAnimal, setFilteredAnimal] = useState([]);
  const [errorMsg, setErrorMsg] = useState("error message here...");
  const [errorStatus, setErrorStatus] = useState("fail");

  useEffect(() => {
    animalService.getAll().then((initialAnimals) => {
      setAnimals(initialAnimals);
    });
  }, []);

  const animalsToShow = showAll
    ? animals
    : animals.filter((animal) => animal.endangered === true);

  const handleAnimalChange = (e) => {
    setNewAnimal(e.target.value);
  };

  const handleClick = () => {
    setShowAll(!showAll);
  };

  const handleFilterChange = (e) => {
    const foundAnimals = animals.filter((animal) =>
      animal.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );

    if (e.target.value === "") {
      setFilteredAnimal([]);
    } else {
      setFilteredAnimal(foundAnimals);
    }
  };

  const handleToggle = (id) => {
    const foundAnimal = animals.find((animal) => animal.id === id);
    const updatedAnimal = {
      ...foundAnimal,
      endangered: !foundAnimal.endangered,
    };

    animalService
      .update(id, updatedAnimal)
      .then((returnedAnimal) => {
        setAnimals(
          animals.map((animal) => (animal.id === id ? returnedAnimal : animal)),
        );
      })
      .catch(() => {
        setErrorStatus("fail");
        setErrorMsg(`'${foundAnimal.name}' was already deleted from server`);
        setAnimals(animals.filter((animal) => animal.id !== id));
      });
  };

  const addAnimal = (e) => {
    e.preventDefault();
    const animalAlreadyExists = animals.find(
      (animal) => animal.name.toLowerCase() === newAnimal.toLowerCase(),
    );

    if (animalAlreadyExists) {
      alert(`${newAnimal} is already existed.`);
      return;
    }

    const newObject = {
      name: newAnimal,
      endangered: Math.random() < 0.5,
    };

    animalService.create(newObject).then((returnedAnimal) => {
      setAnimals(animals.concat(returnedAnimal));
      setErrorMsg(`Added ${returnedAnimal.name}`, errorStatus);
      setErrorStatus("success");
      setNewAnimal("");
    });
  };

  const deleteAnimal = (id) => {
    animalService
      .deleteAnimal(id)
      .then(() => {
        setAnimals(animals.filter((animal) => animal.id !== id))
      });
  };

  return (
    <div>
      <h1>🐬 Animals 🐘</h1>

      <Notification message={errorMsg} status={errorStatus} />

      <button onClick={handleClick}>
        I wanna see {showAll ? "Endangered" : "All"} Animals
      </button>

      <ul>
        {animalsToShow.map((animal) => (
          <Animal
            key={animal.id}
            animal={animal}
            toggleImportance={() => handleToggle(animal.id)}
            clickDeleteHandler={() => {
              deleteAnimal(animal.id);
            }}
          />
        ))}
      </ul>

      <AddAnimal
        clickSubmitHandler={addAnimal}
        clickEventHandler={handleAnimalChange}
        newAnimal={newAnimal}
      />

      <FilterAnimal
        clickEventHandler={handleFilterChange}
        filteredAnimal={filteredAnimal}
      />

      <Footer />
    </div>
  );
};

export default App;
