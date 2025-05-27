export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string; // Date מגיע כ-ISO string מהשרת
  collages: Collage[];
}

export interface Image {
  id: number;
  imageUrl: string;
  collageId: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  rotation: number;
}

export interface Collage {
  id: number;
  userId: number;
  collageUrl: string;
  name: string;
  createdAt: string;      
  updatedAt?: string | null;
  images: Image[];
}

export interface CreateUserRequest {
  name: string
  email: string
  status: "active" | "inactive"
}

export interface UpdateUserRequest {
  name: string
  email: string
  status: "active" | "inactive"
}
