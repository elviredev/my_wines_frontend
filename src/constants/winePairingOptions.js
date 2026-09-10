import { GiMeat, GiChocolateBar, GiCupcake, GiShrimp, GiCookingPot, GiCampCookingPot } from "react-icons/gi";
import { FaFish, FaCheese, FaWineGlass } from "react-icons/fa"

export const WINE_PAIRING_OPTIONS = [
    { value: "viande-rouge", label: "Viande rouge", icon: GiMeat },
    { value: "fromage", label: "Fromage", icon: FaCheese },
    { value: "poisson", label: "Poisson", icon: FaFish },
    { value: "fruits-de-mer", label: "Fruits de mer", icon: GiShrimp },
    { value: "dessert", label: "Dessert", icon: GiCupcake },
    { value: "chocolat", label: "Chocolat", icon: GiChocolateBar },
    { value: "aperitif", label: "Apéritif", icon: FaWineGlass },
    { value: "cuisine-italienne", label: "Cuisine italienne", icon: GiCookingPot },
    { value: "cuisine-asiatique", label: "Cuisine asiatique", icon: GiCampCookingPot },
]