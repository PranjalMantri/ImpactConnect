const FeatureCard = ({ icon, title, children }) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="bg-blue-100 rounded-full p-4 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

export default FeatureCard;
