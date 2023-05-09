
#ifdef GL_ES
precision mediump float;
#endif

float PI = 3.14159265358979323846;
float EULER = 0.57721566490153286060;

float EPSILON = 0.00001;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_cccrrr;



float gamma(float x)
{
    return sqrt(2.0 * PI / (x + EPSILON)) * pow(x / EULER, x);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    float x = uv.x;
    float y = uv.y;

    float p = 0.5 * sin(u_time ) + 0.5 + 2.0 * u_cccrrr;
    float t = 0.5 * sin(u_time / 3.0) + 0.5;

    float red_a = x * log((p + 0.5) / tan(x)) * 5.0;
    float red_b = pow(x, tan(y)) / (p + t);
    
    float green = p * pow(x, -p / y);

    float blue_a = (y * atan(gamma(exp(x)))) / (p + EPSILON);
    float blue_b = pow(x, EULER / (y + EPSILON)) * pow(log(y), x);

    float red = red_a * red_b;

    vec3 col = vec3(red, mix(blue_b, red, t), mix(blue_a, blue_b, t));
    gl_FragColor = vec4(col,1.0);
}
