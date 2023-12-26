import struct
from PyQt5.QtWidgets import QApplication, QOpenGLWidget, QVBoxLayout, QWidget
from PyQt5.QtCore import QTimer
from OpenGL.GL import *
from OpenGL.GLU import *

file_path = r"C:\Users\Макс\OneDrive\Рабочий стол\output.bin"
vertex_size = 24  # розмір одного запису в байтах

class SketchUpViewer(QOpenGLWidget):
    def __init__(self, parent=None):
        super(SketchUpViewer, self).__init__(parent)
        self.rotation_angle = 0

        self.timer = QTimer(self)
        self.timer.timeout.connect(self.rotateModel)
        self.timer.start(16)  # Set the timer interval for smooth rotation

    def initializeGL(self):
        glEnable(GL_DEPTH_TEST)
        glEnable(GL_LIGHTING)
        glEnable(GL_LIGHT0)
        glEnable(GL_COLOR_MATERIAL)
        glShadeModel(GL_SMOOTH)
        glClearColor(0.0, 0.0, 0.0, 0.0)
        glClearDepth(1.0)

        # Set up light source
        light_position = [1.0, 1.0, 1.0, 0.0]
        light_diffuse = [1.0, 1.0, 1.0, 1.0]
        glLightfv(GL_LIGHT0, GL_POSITION, light_position)
        glLightfv(GL_LIGHT0, GL_DIFFUSE, light_diffuse)

    def resizeGL(self, w, h):
        glViewport(0, 0, w, h)
        glMatrixMode(GL_PROJECTION)
        glLoadIdentity()
        gluPerspective(45, w / h, 1, 100)

    def paintGL(self):
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
        glMatrixMode(GL_MODELVIEW)
        glLoadIdentity()

        # Змінення параметрів gluLookAt для віддаленого огляду
        gluLookAt(0, 0, 50, 0, 0, 0, 0, 1, 0)

        glRotatef(self.rotation_angle, 0, 1, 0)

        # Load and render your 3D model
        self.renderModel()

    def renderModel(self):
        try:
            with open(file_path, 'rb') as file:
                data = file.read()

            num_triangles = len(data) // vertex_size

            glBegin(GL_TRIANGLES)
            for i in range(num_triangles):
                start_byte = i * vertex_size
                end_byte = (i + 1) * vertex_size
                vertex_data = data[start_byte:end_byte]

                x, y, z, r, g, b = struct.unpack('ffffff', vertex_data)

                glColor3f(r, g, b)  # Set color to white
                glVertex3f(x, y, z)

            glEnd()

        except Exception as e:
            print(f"Error loading model: {e}")

    def rotateModel(self):
        self.rotation_angle += 0.5
        self.update()

if __name__ == '__main__':
    import sys

    app = QApplication(sys.argv)
    viewer = SketchUpViewer()

    layout = QVBoxLayout()
    layout.addWidget(viewer)

    main_window = QWidget()
    main_window.setLayout(layout)
    main_window.resize(1000, 800)
    main_window.show()

    sys.exit(app.exec_())
