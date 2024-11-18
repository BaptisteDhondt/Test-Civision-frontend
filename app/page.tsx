"use client";
import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface DataItem {
  id: number;
  saison: string;
  prix: number;
  age: number;
  niveau: string;
  compte: boolean;
  passe: string;
}

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [filters, setFilters] = useState({
    saison: "all",
    niveau: "all",
    compte: "all",
    passe: "all",
    ageRange: [0, 100],
    priceRange: [0, 1000],
  });
  const [limits, setLimits] = useState({
    age: [0, 100],
    prix: [0, 1000],
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCriteria, setSelectedCriteria] = useState<string>("niveau");

  useEffect(() => {
    fetch("/database.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);

        const ageValues = data.map((item: { age: any }) => item.age);
        const priceValues = data.map((item: { prix: any }) => item.prix);
        setLimits({
          age: [Math.min(...ageValues), Math.max(...ageValues)],
          prix: [Math.min(...priceValues), Math.max(...priceValues)],
        });
        setFilters((prevFilters) => ({
          ...prevFilters,
          ageRange: [Math.min(...ageValues), Math.max(...ageValues)],
          priceRange: [Math.min(...priceValues), Math.max(...priceValues)],
        }));
      });
  }, []);

  const handleFilterChange = (filterName: string, value: string | [number, number]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    setCurrentPage(1);
  };

  useEffect(() => {
    const filtered = data.filter((item) => {
      return (
        (filters.saison === "all" || item.saison === filters.saison) &&
        (filters.niveau === "all" || item.niveau === filters.niveau) &&
        (filters.compte === "all" || String(item.compte) === filters.compte) &&
        (filters.passe === "all" || item.passe === filters.passe) &&
        item.age >= filters.ageRange[0] &&
        item.age <= filters.ageRange[1] &&
        item.prix >= filters.priceRange[0] &&
        item.prix <= filters.priceRange[1]
      );
    });
    setFilteredData(filtered);
  }, [filters, data]);

  const calculateAveragePrice = () => {
    if (filteredData.length === 0) return 0;
    const total = filteredData.reduce((sum, item) => sum + item.prix, 0);
    return (total / filteredData.length).toFixed(2);
  };

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const priceHistogramData = {
    labels: filteredData.map((_, i) => `Prix ${i + 1}`),
    datasets: [
      {
        label: "Prix",
        data: filteredData.map((item) => item.prix),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const generatePieData = () => {
    const criteriaValues = Array.from(
      new Set(filteredData.map((item) => item[selectedCriteria as keyof DataItem]))
    );

    return {
      labels: criteriaValues.map((value) => String(value)),
      datasets: [
        {
          label: `Répartition par ${selectedCriteria}`,
          data: criteriaValues.map(
            (value) =>
              filteredData.filter((item) => item[selectedCriteria as keyof DataItem] === value)
                .length
          ),
          backgroundColor: criteriaValues.map(
            (_, index) => `hsl(${(index * 360) / criteriaValues.length}, 70%, 50%)`
          ),
        },
      ],
    };
  };

  return (
    <div className="bg-gray-50 min-h-screen">
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tableau de bord</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Saison</label>
        <select
          value={filters.saison}
          onChange={(e) => handleFilterChange("saison", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="all">Toutes</option>
          <option value="printemps">Printemps</option>
          <option value="été">Été</option>
          <option value="automne">Automne</option>
          <option value="hiver">Hiver</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Niveau</label>
        <select
          value={filters.niveau}
          onChange={(e) => handleFilterChange("niveau", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="all">Tous</option>
          <option value="novice">Novice</option>
          <option value="moyen">Moyen</option>
          <option value="pro">Pro</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Compte</label>
        <select
          value={filters.compte}
          onChange={(e) => handleFilterChange("compte", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="all">Tous</option>
          <option value="true">Oui</option>
          <option value="false">Non</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Passe</label>
        <select
          value={filters.passe}
          onChange={(e) => handleFilterChange("passe", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="all">Tous</option>
          <option value="simple">Simple</option>
          <option value="double">Double</option>
          <option value="illimité">Illimité</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Âge</label>
        <div className="flex items-center mt-1 space-x-2">
          <input
            type="number"
            min={limits.age[0]}
            max={limits.age[1]}
            value={filters.ageRange[0]}
            onChange={(e) =>
              handleFilterChange("ageRange", [
                Number(e.target.value),
                filters.ageRange[1],
              ])
            }
            className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <span>-</span>
          <input
            type="number"
            min={limits.age[0]}
            max={limits.age[1]}
            value={filters.ageRange[1]}
            onChange={(e) =>
              handleFilterChange("ageRange", [
                filters.ageRange[0],
                Number(e.target.value),
              ])
            }
            className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prix</label>
        <div className="flex items-center mt-1 space-x-2">
          <input
            type="number"
            min={limits.prix[0]}
            max={limits.prix[1]}
            value={filters.priceRange[0]}
            onChange={(e) =>
              handleFilterChange("priceRange", [
                Number(e.target.value),
                filters.priceRange[1],
              ])
            }
            className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <span>-</span>
          <input
            type="number"
            min={limits.prix[0]}
            max={limits.prix[1]}
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange("priceRange", [
                filters.priceRange[0],
                Number(e.target.value),
              ])
            }
            className="w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>

    <div className="bg-white mt-6 p-6 rounded-lg shadow text-center">
      <h2 className="text-lg font-semibold text-gray-800">
        Prix moyen : {calculateAveragePrice()} €
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-6 mt-6">
      <div className="bg-white p-6 rounded-lg shadow col-span-1">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          Histogramme des prix
        </h3>
        <div className="relative w-full h-[400px]">
          <Bar data={priceHistogramData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Table des données</h3>
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-800">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Saison</th>
                  <th className="px-4 py-2">Prix</th>
                  <th className="px-4 py-2">Âge</th>
                  <th className="px-4 py-2">Niveau</th>
                  <th className="px-4 py-2">Compte</th>
                  <th className="px-4 py-2">Passe</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.saison}</td>
                    <td className="px-4 py-2">{item.prix}</td>
                    <td className="px-4 py-2">{item.age}</td>
                    <td className="px-4 py-2">{item.niveau}</td>
                    <td className="px-4 py-2">{item.compte ? "Oui" : "Non"}</td>
                    <td className="px-4 py-2">{item.passe}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-wrap items-center justify-between mt-4 space-y-2 sm:space-y-0">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
              <span className="text-sm font-medium text-gray-600">
                Page {currentPage} sur {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Répartition par :</h3>
            <select
              value={selectedCriteria}
              onChange={(e) => setSelectedCriteria(e.target.value)}
              className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="niveau">Niveau</option>
              <option value="passe">Passe</option>
              <option value="compte">Compte</option>
              <option value="saison">Saison</option>
              <option value="age">Âge</option>
            </select>
            <div className="relative w-full h-[450px] flex justify-center items-center">
              <Pie data={generatePieData()} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
    </div>
  </div>
</div>

  );
};

export default Dashboard;

