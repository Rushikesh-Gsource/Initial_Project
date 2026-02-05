import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartData } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const blogs = useSelector((state: any) => state.blog.blogs);

    const totalBlogs = blogs.length;
    const totalWords = blogs.reduce((acc: number, blog: any) => {
        const words = blog.body ? blog.body.trim().split(/\s+/).filter((w: string) => w.length > 0).length : 0;
        return acc + words;
    }, 0);

    const data: ChartData<'pie'> = {
        labels: ['Total Blogs', 'Total Words'],
        datasets: [
            {
                label: 'Metrics Comparison',
                data: [totalBlogs, totalWords],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };



    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Project Dashboard</h2>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <Pie data={data} />
            </div>
            {totalBlogs > 0 && (
                <div className="mt-4 text-center">
                    <p className="lead">
                        Average words per blog: <strong>{(totalWords / totalBlogs).toFixed(2)}</strong>
                    </p>
                </div>
            )}
        </div>
    );
}
