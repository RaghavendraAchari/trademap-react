interface Props {
    title: string,
    description: string
}

export default function PageHeader({ title, description }: Props) {
    return <div className="page-header">
        <h1 className='title'>{title}</h1>
        <p className="desc" suppressHydrationWarning>{description}</p>
    </div>
}