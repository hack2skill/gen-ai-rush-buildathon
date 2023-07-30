import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from PIL import Image
import joblib

# from huggingface_hub import InferenceClient
# client = InferenceClient(token="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")

# device = "cuda"
# experimental_pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", revision="fp16", torch_dtype=torch.float16, use_auth_token=True)
# experimental_pipe = experimental_pipe.to("cuda")
# joblib.dump(experimental_pipe, 'filename.pkl', compress = 1)

joblib.dump(autocast,'torchpkl.pkl',compress=1)
