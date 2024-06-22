export interface TrackerProps {
    options: Project[];
    setOptions: React.Dispatch<React.SetStateAction<Project[]>>;
    setValue: function
    // setTask: function;
    // id: string | null
    
}

// Definiciones de tipos para proyecto
export interface Project {
    selected: unknown;
    custom_label_id: string | null;
    description: string;
    email_client: string;
    end_date: string | null;
    id_cliente: string | null;
    init_date: string | null;
    is_active: boolean;
    is_completed: boolean;
    name: string;
    price_hour: string;
    status_uuid: string;
    user_uuid: string;
    uuid: string;
}

// Definición de tareas

export interface Task {
    custom_label_id: null
    end_date: string
    init_date: string
    is_active: boolean
    is_completed: boolean
    label_id: null
    name: string
    project_uuid: string
    status_uuid: string
    uuid: string
}


