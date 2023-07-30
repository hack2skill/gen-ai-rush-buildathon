import joblib
import numpy as np
import aspose.threed as a3d

def model3d_generator(prompt):
    load_model = joblib.load('xm.pkl')
    print('Hello')
    model = joblib.load('model.pkl')
    diffusion = joblib.load('diffusion.pkl')
    sample_latents = joblib.load('sample_latents.pkl')
    device = joblib.load('device.pkl')
    create_pan_cameras = joblib.load('create_pan_cameras.pkl')
    decode_latent_images = joblib.load('decode_latent_images.pkl')
    decode_latent_mesh = joblib.load('decode_latent_mesh.pkl')
    xm=load_model('transmitter', device=device)
    batch_size = 1
    guidance_scale = 15.0
    latents = sample_latents(
        batch_size=batch_size,
        model=model,
        diffusion=diffusion,
        guidance_scale=guidance_scale,
        model_kwargs=dict(texts=[prompt] * batch_size),
        progress=True,
        clip_denoised=True,
        use_fp16=True,
        use_karras=True,
        karras_steps=32,
        sigma_min=1e-3,
        sigma_max=160,
        s_churn=0,
    )
    render_mode = 'nerf'
    size = 64  
    cameras = create_pan_cameras(size, device)
    images_list = []
    for i, latent in enumerate(latents):
        images = decode_latent_images(xm, latent, cameras, rendering_mode=render_mode)
        images_list.append(images)
    textures = []
    for images in images_list:
        texture = np.concatenate(images, axis=2)  # Concatenate images along the channel dimension
        textures.append(texture)
    vertex_colors = []
    for tex in textures:
        vertex_colors.append(tex.reshape(-1, 3))
    for i, (latent, colors) in enumerate(zip(latents, vertex_colors)):
        t = decode_latent_mesh(xm, latent).tri_mesh()
        t.vertex_colors = colors.astype(np.uint8)
        with open(f'static/mesh_{i}.ply', 'wb') as f:
            t.write_ply(f)
        with open(f'static/shark_mesh_{i}.obj', 'w') as f:
            t.write_obj(f)
    scene = a3d.Scene.from_file("static/shark_mesh_0.obj")
    scene.save("static/mesh_0.glb")
