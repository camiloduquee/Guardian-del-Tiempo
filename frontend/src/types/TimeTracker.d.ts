export interface TrackerProps {
    options: Project[];
    setOptions: React.Dispatch<React.SetStateAction<Project[]>>;
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