
function Contact() {
    return (
        <>
           <section
      id="contact-form"
      className="p-[38px] md:p-[0px] relative bottom-[99px] flex items-center flex-col w-full min-h-[103vh] md:min-h-[106vh]  px-4"
    >
      <div
        className="w-[300px] md:w-[700px] max-w-3xl relative md:top-[206px] top-[-22px] bg-[#10121b] rounded-lg p-8 shadow-lg"
      >
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-6"
        >
          <input
            type="hidden"
            name="access_key"
            value="4ddd6372-81c5-445d-90c3-35110dd6deed"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-1"
              >Subject (Optional)</label
            >
            <input
              type="text"
              name="subject"
              placeholder="What's this about?"
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Your message here..."
              required
              className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10l9 4 9-4-9-4-9 4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokew={2}
                  d="M3 10l9 4 9-4M3 10l9 4v8"
                />
              </svg>
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>

        </>
    )
}

export default Contact
