import { Department } from "./department";
import { Employee } from "./employee";

export class Task{
    id: number;
    name: string;
    description: string;
    department: Department;
    employees: Employee[];
    deadline: Date;
}