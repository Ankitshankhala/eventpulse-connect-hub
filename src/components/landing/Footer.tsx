
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold">EP</span>
            </div>
            <span className="text-xl font-bold">EventPulse</span>
          </div>
          
          <div className="flex flex-wrap gap-6 text-gray-300">
            <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="/terms" className="hover:text-blue-400 transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy</a>
            <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 EventPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
