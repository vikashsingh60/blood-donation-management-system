const Features = () => {
  return (
    <div className="px-10 py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">AI Powered Features</h2>

      <div className="grid grid-cols-4 gap-6">

        <div className="p-6 bg-white rounded-xl shadow">
          🧠 <h3>Prediction</h3>
          <p>Future blood demand analysis</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          🤝 <h3>Matching</h3>
          <p>Smart donor matching</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          🚨 <h3>Alerts</h3>
          <p>Emergency notifications</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          💬 <h3>Chatbot</h3>
          <p>Instant help system</p>
        </div>

      </div>
    </div>
  );
};

export default Features;