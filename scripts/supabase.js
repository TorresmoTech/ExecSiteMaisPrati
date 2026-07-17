const client = window.supabase.createClient(
    CONFIG.SUPABASE_URL,
    CONFIG.SUPABASE_ANON_KEY
);

window.salvarConsultoria = async function (dados) {

    const { data, error } = await client
        .from("consultorias")
        .insert([dados])
        .select();

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
};