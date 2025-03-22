import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { motion } from "framer-motion";
import AllRecipes from "./all";
import React from 'react';
import Category from "../components/Category";
import FoodyApp from "../components/Foody";

function Home() {
    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8"
        >
            <div className="w-full">
                <FoodyApp />
            </div>
            <div className="w-full">
                <Category />
            </div>
            <div className="w-full">
                <Popular />
            </div>
            <div className="w-full">
                <Veggie />
            </div>
            <div className="w-full">
                <AllRecipes />
                <img src="/hero.jpg" alt="" />
            </div>
            
        </motion.div>
    );
}

export default Home;
