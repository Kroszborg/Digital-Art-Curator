# 🎨 Digital Art Curator

The Digital Art Curator is a web application that provides personalized art recommendations based on users' stylistic preferences. Powered by deep learning and recommendation algorithms, it curates art from various styles, artists, and genres, creating a tailored experience for art enthusiasts and collectors alike.

---

## 🔗 Features
- **Personalized Art Recommendations**: Suggests artworks based on user-selected themes, styles, or artists.
- **Interactive Exploration**: Enables users to explore artworks dynamically and filter by different attributes.
- **Data-Driven Insights**: Visualizes user preferences and trends across artwork genres.
- **Simple User Interface**: Offers an easy-to-navigate experience with visually appealing art displays.

---

## 📋 Technologies

- **Frontend**:
  - **React.js**: Creates an interactive, responsive interface for browsing and filtering artworks.
  - **JavaScript/HTML/CSS**: Core technologies for handling user inputs, image display, and layout.

- **Backend**:
  - **FastAPI/Flask**: Hosts the deep learning model and handles recommendation requests, ensuring fast and scalable API responses.
  - **TensorFlow/Keras**: Runs the recommendation model for personalized art suggestions.
  - **Database (MongoDB)**: Stores artwork metadata and user preferences, enabling quick retrieval and filtering.

- **Data & Model**:
  - **WikiArt Dataset**: Provides various artwork images and metadata, offering rich training material.
  - **Recommendation Model**: Uses a combination of collaborative filtering and content-based filtering to recommend relevant art pieces.

---

## 📦 Setup

### Prerequisites
- Python 3.7+
- Node.js & npm
- MongoDB (or another database of choice)

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/digital-art-curator.git
   cd digital-art-curator
   ```

2. **Backend Setup**:
   - **Install Dependencies**:
     ```bash
     pip install -r requirements.txt
     ```
   - **Train/Load the Model**:
     - Train the recommendation model using the WikiArt dataset or load a pre-trained model.
     - Place the model file in the `models` directory.

3. **Database Setup**:
   - Import artwork metadata into MongoDB (or an alternative database) and ensure that it is accessible by the backend.
   - Create a `.env` file in the root directory with:
     ```
     DATABASE_URL=mongodb://localhost:27017/artworks
     ```

4. **Frontend Setup**:
   - **Navigate to Frontend**:
     ```bash
     cd frontend
     ```
   - **Install Dependencies**:
     ```bash
     npm install
     ```
   - **Run Frontend**:
     ```bash
     npm start
     ```

5. **Start the Backend Server**:
   - Return to the main directory and run:
     ```bash
     python app.py
     ```

6. **Open in Browser**:
   - Go to `http://localhost:3000` to interact with the application.

---

## 🎮 Usage Guide

1. **Select Preferences**: Choose art preferences, such as style, color, and theme, from the dropdowns or input fields.
2. **Receive Recommendations**: The app fetches relevant art pieces based on your preferences and displays them in an interactive gallery.
3. **Explore Artwork Details**: Click on any artwork to view details, including artist, style, and related works.

---

## 🎨 Art Recommendation Algorithm

| User Input         | Recommendation Based On         |
|--------------------|---------------------------------|
| Style              | Similar art style               |
| Artist             | Art by the same or similar artists |
| Color Scheme       | Matching or complementary colors |
| Popularity/Trend   | Trending or popular artworks    |

---

## 🛠️ Future Improvements

- **Expanded Metadata**: Add more data fields, such as time period and mood.
- **Enhanced Recommendations**: Use neural collaborative filtering for more refined recommendations.
- **Social Features**: Enable users to save, like, and share favorite artworks.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---

## 📄 License
This project is licensed under the MIT License.

---

## 🌐 Acknowledgements

- [WikiArt Dataset](https://www.wikiart.org/en/) for providing a variety of artwork images and metadata.
- [TensorFlow](https://www.tensorflow.org/) and [FastAPI](https://fastapi.tiangolo.com/) for model deployment and API handling.
- Inspiration from recommendation engines and personalized content applications.
