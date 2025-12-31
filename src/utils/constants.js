// Default categories
export const DEFAULT_CATEGORIES = [
    { id: "burp", name: "Burps", count: 0 },
    { id: "fart", name: "Farts", count: 0 },
    { id: "bug", name: "Bugs Introduced", count: 0 },
    { id: "coffee", name: "Coffee Consumed", count: 0 },
    { id: "sass", name: "Sass", count: 0 }
];

// Theme definitions
export const themes = {
    "dragon-dynasty": {
        name: "Dragon Dynasty",
        colors: {
            background: "#B71C1C",
            cardBackground: "#FAFAF5",
            text: "#4E342E",
            accent: "#D4AF37",
            border: "#D4AF37",
            gold: "#D4AF37",
            jade: "#2E7D32",
            lantern: "#FFE082"
        },
        font: "'Inter', sans-serif",
        icons: {
            burp: "💨",
            fart: "🌬️",
            bug: "🥠",
            coffee: "☕",
            default: "🏮"
        },
        categoryNames: {
            burp: "Satisfied Belches",
            fart: "Aromatic Winds",
            bug: "Kitchen Mishaps",
            coffee: "Tea Ceremonies"
        },
        phrases: {
            burp: [
                "A satisfied burp — must've been good food!",
                "Approval from the belly!",
                "Another happy customer sound."
            ],
            fart: [
                "Kitchen exhaust… from the customer side.",
                "A mysterious aroma escapes the dining hall.",
                "A wandering scent travels past the tables."
            ],
            bug: [
                "A bug in the kitchen — not the food kind.",
                "Recipe error! Something needs fixing.",
                "This dish was undercooked… in code."
            ],
            coffee: [
                "Order added to the chef's ledger.",
                "Recorded on today's specials board.",
                "Another entry for the restaurant log."
            ],
            sass: [
                "A pinch of sass was sprinkled.",
                "Sass logged — served with attitude.",
                "Seasoned with sassiness."
            ],
            default: [
                "Order added to the chef's ledger.",
                "Recorded on today's specials board.",
                "Another entry for the restaurant log."
            ]
        }
    },
    "neon-nexus": {
        name: "Neon Nexus",
        colors: {
            background: "#020617",
            cardBackground: "#0f172a",
            text: "#ffffff",
            accent: "#22d3ee",
            border: "#1e293b"
        },
        font: "'JetBrains Mono', monospace",
        categoryNames: {
            burp: "Audio Packets",
            fart: "Gas Leaks",
            bug: "System Errors",
            coffee: "Energy Drinks"
        },
        phrases: {
            burp: [
                "Audio packet overflow detected.",
                "Sound wave anomaly registered.",
                "Vocal frequency spike logged."
            ],
            fart: [
                "Stealth gas leak registered.",
                "Atmospheric disturbance detected.",
                "Bio-emission signal captured."
            ],
            bug: [
                "Unhandled exception vibes.",
                "System integrity compromised.",
                "Error code: HUMAN_INTERVENTION_REQUIRED"
            ],
            coffee: [
                "Caffeine injection successful.",
                "Processing power increased by 200%.",
                "System alertness level: MAXIMUM"
            ],
            sass: [
                "SASS module injected.",
                "Style attitude recorded.",
                "Sass event committed to memory."
            ],
            default: [
                "Event synced to mainframe.",
                "Data point logged successfully.",
                "New entry added to database."
            ]
        }
    },
    "forest-grove": {
        name: "Forest Grove",
        colors: {
            background: "#1B4332",
            cardBackground: "#F0F7F4",
            text: "#2D3E2D",
            accent: "#52B788",
            border: "#74C69D",
            gold: "#95D5B2",
            jade: "#2D6A4F",
            lantern: "#B7E4C7"
        },
        font: "'Inter', sans-serif",
        categoryNames: {
            burp: "Forest Echoes",
            fart: "Nature's Whispers",
            bug: "Garden Discoveries",
            coffee: "Morning Dew"
        },
        phrases: {
            burp: [
                "A natural release into the forest air.",
                "The earth's satisfaction expressed.",
                "A moment of natural contentment."
            ],
            fart: [
                "A gentle breeze through the leaves.",
                "Nature's way of expressing itself.",
                "A soft whisper in the grove."
            ],
            bug: [
                "A discovery along the forest path.",
                "Nature's gentle surprises.",
                "The forest keeps us humble."
            ],
            coffee: [
                "Freshness added to the morning collection.",
                "Another moment of natural energy.",
                "The forest's vitality preserved."
            ],
            sass: [
                "A touch of nature's attitude.",
                "Sassiness grows like forest moss.",
                "Attitude added with natural flair."
            ],
            default: [
                "A moment captured in the forest light.",
                "Nature's rhythm preserved.",
                "Another note in the forest's song."
            ]
        }
    },
    "ruby-sea": {
        name: "Ruby Sea",
        colors: {
            background: "#122236",
            cardBackground: "#0e1b2a",
            text: "#a2aabc",
            accent: "#ff4c5a",
            border: "#214b78",
            gold: "#ffd580",
            jade: "#3da5f6",
            lantern: "#62c6ff"
        },
        font: "'Inter', sans-serif",
        categoryNames: {
            burp: "Ocean Depths",
            fart: "Sea Currents",
            bug: "Coral Reefs",
            coffee: "Pearl Dives"
        },
        phrases: {
            burp: [
                "A bubble rises from the depths.",
                "The ocean's breath surfaces.",
                "A current of satisfaction flows."
            ],
            fart: [
                "A gentle current stirs the waters.",
                "The sea whispers its secrets.",
                "Oceanic winds drift by."
            ],
            bug: [
                "A treasure discovered in the depths.",
                "The reef reveals its mysteries.",
                "Something glimmers in the abyss."
            ],
            coffee: [
                "A pearl added to the collection.",
                "Deeper into the ocean we dive.",
                "The sea's bounty increases."
            ],
            sass: [
                "A sharp current of attitude.",
                "Sass flows like ocean waves.",
                "Attitude as deep as the sea."
            ],
            default: [
                "Another entry in the captain's log.",
                "The depths record this moment.",
                "A ripple in the Ruby Sea."
            ]
        }
    }
};

