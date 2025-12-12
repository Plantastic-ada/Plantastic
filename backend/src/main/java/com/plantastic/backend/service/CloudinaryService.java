package com.plantastic.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    /**
     * File upload on Cloudinary with a signed preset
     * @param file file to upload
     * @param folder target folder on Cloudinary
     * @return image secure url
     */
    public String uploadFile(MultipartFile file, String folder) throws IOException {
        long timestamp = System.currentTimeMillis() / 1000;

        String presetName = "Plantastic";

        // Params to sign. We can use @SuppressWarning there because we control the types
        @SuppressWarnings("unchecked")
        Map<String, Object> paramsToSign = ObjectUtils.asMap(
                "folder", folder,
                "overwrite", true,
                "timestamp", timestamp,
                "upload_preset", presetName
        );

        // Generate the signature
        String signature = cloudinary.apiSignRequest(paramsToSign, cloudinary.config.apiSecret);

        // We can use @SuppressWarning there because we control the types
        @SuppressWarnings("unchecked")
        Map<String, Object> uploadParams = ObjectUtils.asMap(
                "folder", folder,
                "overwrite", true,
                "timestamp", timestamp,
                "api_key", cloudinary.config.apiKey,
                "signature", signature,
                "upload_preset", presetName
        );

        // Upload Cloudinary. We can use @SuppressWarning there because cloudinary.uploader().upload always return a Map<String, Object>
        @SuppressWarnings("unchecked")
        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadParams);

        // Retrieves the secure url of the file we uploaded
        return (String) uploadResult.get("secure_url");
    }
}