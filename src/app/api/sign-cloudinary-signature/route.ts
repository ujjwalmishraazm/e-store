import cloudinary from "@/lib/cloudinay";

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        console.log(payload);
        const { paramsToSign } = payload;
        console.log(paramsToSign);
        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "NJDEJND"
        );
        return Response.json({ signature });
    } catch (error) {
        console.log("error", error);
        return Response.json(
            { success: false, message: error || "internal server error" },
            { status: 500 }
        );
    }
}
