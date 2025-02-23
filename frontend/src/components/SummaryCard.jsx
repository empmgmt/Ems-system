const SummaryCard = ({ icon, text, number, color }) => (
    <div className="rounded flex bg-white p-4 shadow-md">
      <div className={`text-xl flex justify-center items-center ${color} text-white w-12 h-12 rounded-full`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
  
  export default SummaryCard;
  