import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './routes/index';
import QuestionPage from './routes/questionPage';
import Results from './routes/results';
import { loader as categoriesLoader } from './routes/index';
import ErrorPage from './error';
import { QuizProvider } from './quizContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    loader: categoriesLoader,
  },
  {
    path: "/quiz",
    element: <QuestionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/results",
    element: <Results />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizProvider>
      <RouterProvider router={router} />
    </QuizProvider>
  </StrictMode>,
)
