const fs = require('fs');
let data = fs.readFileSync('src/components/Navbar.js', 'utf8');

data = data.replace(/<span className="material-symbols-outlined text-\[24px\]">menu<\/span>/g, '<MdOutlineMenu className="text-[24px]" />');
data = data.replace(/<span className="material-symbols-outlined text-\[24px\]">search<\/span>/g, '<MdOutlineSearch className="text-[24px]" />');
data = data.replace(/<span className="material-symbols-outlined text-\[24px\]">person<\/span>/g, '<MdOutlinePerson className="text-[24px]" />');
data = data.replace(/<span className="material-symbols-outlined text-\[24px\]">shopping_bag<\/span>/g, '<MdOutlineShoppingBag className="text-[24px]" />');

data = data.replace(/backgroundColor: "white",\s*backdropFilter: "blur\(10px\)",/g, 'backgroundColor: "#F3F3F3",\n            backdropFilter: "blur(10px)",');
data = data.replace(/className="w-full transition-all duration-300 bg-white"/g, 'className="w-full transition-all duration-300 bg-[#F3F3F3]"');
data = data.replace(/bg-white`\}/g, 'bg-[#F3F3F3]`}');

fs.writeFileSync('src/components/Navbar.js', data);
console.log('Patched Navbar.js successfully');
