
const upload = async (req, res) => {
    try {

        if (req.files.length > 0) {
            const uploadedPaths = req.files.map(file => file.filename);

            return res.json({ status: true, message: 'Images Uploaded', data: uploadedPaths });
        } else {
            return res.json({ status: false, message: 'Images not uploaded', data: [] });
        }

    } catch (e) {
        return res.json({ status: false, message: e.message, data: [] });
    }
}


module.exports = {
    upload,
}